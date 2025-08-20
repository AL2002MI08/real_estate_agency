export interface NavBarProps {
    onLogout?: () => void;
    loggedIn?: boolean;
    sectionsRef?: Record<string, React.RefObject<HTMLDivElement>>;
}