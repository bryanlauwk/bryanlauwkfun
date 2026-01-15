import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { User, Session } from "@supabase/supabase-js";

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [initialized, setInitialized] = useState(false);

  const checkAdminRole = useCallback(async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", userId)
        .eq("role", "admin")
        .maybeSingle();
      
      if (error) {
        console.error("Error checking admin role:", error);
        return false;
      }
      return !!data;
    } catch (error) {
      console.error("Error checking admin role:", error);
      return false;
    }
  }, []);

  // Timeout safety net to prevent infinite loading
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (loading && !initialized) {
        console.warn('Auth loading timed out after 5 seconds');
        setLoading(false);
        setInitialized(true);
      }
    }, 5000);

    return () => clearTimeout(timeout);
  }, [loading, initialized]);

  useEffect(() => {
    let mounted = true;

    const initializeAuth = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error("Error getting session:", error);
          if (mounted) {
            setLoading(false);
            setInitialized(true);
          }
          return;
        }

        if (!mounted) return;

        setSession(session);
        setUser(session?.user ?? null);

        if (session?.user) {
          const adminStatus = await checkAdminRole(session.user.id);
          if (mounted) {
            setIsAdmin(adminStatus);
          }
        }
      } catch (error) {
        console.error("Error initializing auth:", error);
      } finally {
        if (mounted) {
          setLoading(false);
          setInitialized(true);
        }
      }
    };

    initializeAuth();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (!mounted) return;

      setSession(session);
      setUser(session?.user ?? null);

      if (session?.user) {
        const adminStatus = await checkAdminRole(session.user.id);
        if (mounted) {
          setIsAdmin(adminStatus);
        }
      } else {
        setIsAdmin(false);
      }
      
      // Ensure loading is false after auth state changes
      if (loading) {
        setLoading(false);
        setInitialized(true);
      }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [checkAdminRole, loading]);

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
  };

  const signUp = async (email: string, password: string) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: window.location.origin,
      },
    });
    if (error) throw error;
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  };

  return {
    user,
    session,
    loading,
    isAdmin,
    signIn,
    signUp,
    signOut,
  };
}
