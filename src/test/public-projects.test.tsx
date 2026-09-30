import { cleanup, renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { usePublicProjects } from '@/hooks/useProjects';
import { bundledPublicProjects } from '@/data/public-projects';

const mock = vi.hoisted(() => ({ request: vi.fn() }));
vi.mock('@/integrations/supabase/safe-client', () => ({ safeSupabase: {
  from: () => ({ select: () => ({ eq: () => ({ order: () => ({ abortSignal: mock.request }) }) }) }),
} }));
afterEach(cleanup);
function setup() {
  const client = new QueryClient({ defaultOptions: { queries: { retryDelay: 0 } } });
  return renderHook(() => usePublicProjects(), { wrapper: ({ children }) => <QueryClientProvider client={client}>{children}</QueryClientProvider> });
}
describe('public archive availability', () => {
  it('shows bundled links while the backend is pending', () => {
    mock.request.mockImplementation(() => new Promise(() => {}));
    const { result } = setup();
    expect(result.current.data).toEqual(bundledPublicProjects);
    expect(result.current.data).toHaveLength(12);
    expect(result.current.isLoading).toBe(false);
  });
  it('keeps the archive available after a failed request', async () => {
    mock.request.mockResolvedValue({ data: null, error: new Error('unavailable') });
    const { result } = setup();
    await waitFor(() => expect(result.current.isError).toBe(true));
    expect(result.current.data).toEqual(bundledPublicProjects);
  });
  it('honors an empty live catalogue instead of restoring removed projects', async () => {
    mock.request.mockResolvedValue({ data: [], error: null });
    const { result } = setup();
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toEqual([]);
  });
  it('replaces the snapshot with the live catalogue', async () => {
    const live = [{ ...bundledPublicProjects[0], title: 'Updated title' }];
    mock.request.mockResolvedValue({ data: live, error: null });
    const { result } = setup();
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toEqual(live);
  });
});
