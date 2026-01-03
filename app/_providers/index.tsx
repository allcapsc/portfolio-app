import { Snowfall } from "@/components/snow-fall";
import { ThemeProvider } from "@/components/theme-provider";

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
        ><Snowfall/>{children}
        </ThemeProvider>
    );
}
