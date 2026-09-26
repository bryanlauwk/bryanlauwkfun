import { describe, expect, it } from "vitest";
import { safeSupabase } from "@/integrations/supabase/safe-client";
import { recordStampReaction } from "@/hooks/useStampReactions";

describe("Supabase initialization without build-time environment variables", () => {
  it("loads the stamp reaction client using its configured fallback", () => {
    expect(safeSupabase).toBeDefined();
    expect(recordStampReaction).toBeTypeOf("function");
  });
});
