import { Snowfall } from "@/components/effects/snow-fall";
import { ThemeProvider } from "@/components/features/theme-provider";

export default function Providers({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
        >{children}
        </ThemeProvider>
    );
}
