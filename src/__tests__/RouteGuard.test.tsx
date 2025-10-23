import { render, screen } from '@testing-library/react';
import { useRouter, usePathname } from 'next/navigation';
import { RouteGuard } from '@/features/auth/RouteGuard';
import { useAuth } from '@/features/auth/AuthContext';

// Mock Next.js navigation
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  usePathname: jest.fn(),
}));

// Mock Auth Context
jest.mock('@/features/auth/AuthContext', () => ({
  useAuth: jest.fn(),
}));

describe('RouteGuard', () => {
  const mockPush = jest.fn();
  const mockUseRouter = useRouter as jest.MockedFunction<typeof useRouter>;
  const mockUsePathname = usePathname as jest.MockedFunction<typeof usePathname>;
  const mockUseAuth = useAuth as jest.MockedFunction<typeof useAuth>;

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseRouter.mockReturnValue({ push: mockPush } as any);
  });

  it('should redirect to login when not authenticated and accessing protected route', () => {
    mockUseAuth.mockReturnValue({
      isAuthenticated: false,
      isLoading: false,
      user: null,
      token: null,
      login: jest.fn(),
      logout: jest.fn(),
    });
    mockUsePathname.mockReturnValue('/ajustes/mi-cuenta');

    render(
      <RouteGuard>
        <div>Protected Content</div>
      </RouteGuard>
    );

    expect(mockPush).toHaveBeenCalledWith('/login');
  });

  it('should render children when authenticated', () => {
    mockUseAuth.mockReturnValue({
      isAuthenticated: true,
      isLoading: false,
      user: { id: '1', name: 'Test User', email: 'test@example.com' },
      token: 'mock-token',
      login: jest.fn(),
      logout: jest.fn(),
    });
    mockUsePathname.mockReturnValue('/ajustes/mi-cuenta');

    render(
      <RouteGuard>
        <div>Protected Content</div>
      </RouteGuard>
    );

    expect(screen.getByText('Protected Content')).toBeInTheDocument();
    expect(mockPush).not.toHaveBeenCalled();
  });

  it('should show loading spinner while checking authentication', () => {
    mockUseAuth.mockReturnValue({
      isAuthenticated: false,
      isLoading: true,
      user: null,
      token: null,
      login: jest.fn(),
      logout: jest.fn(),
    });
    mockUsePathname.mockReturnValue('/ajustes/mi-cuenta');

    render(
      <RouteGuard>
        <div>Protected Content</div>
      </RouteGuard>
    );

    expect(screen.queryByText('Protected Content')).not.toBeInTheDocument();
  });
});
