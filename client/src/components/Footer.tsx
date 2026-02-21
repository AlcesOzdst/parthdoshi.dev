export function Footer() {
    const year = new Date().getFullYear();

    return (
        <footer className="border-t border-primary/20 border-dashed py-8 text-center font-mono text-xs text-muted-foreground bg-black">
            <div className="container mx-auto px-4">
                <div className="flex justify-center gap-6 mb-4">
                    <a
                        href="https://github.com/AlcesOzdst"
                        target="_blank"
                        rel="noreferrer"
                        className="hover:text-primary transition-colors"
                    >
                        [GitHub]
                    </a>
                    <a
                        href="https://linkedin.com/in/parthdoshi404"
                        target="_blank"
                        rel="noreferrer"
                        className="hover:text-primary transition-colors"
                    >
                        [LinkedIn]
                    </a>
                    <a
                        href="mailto:parthdoshi404@gmail.com"
                        className="hover:text-primary transition-colors"
                    >
                        [Email]
                    </a>
                </div>
                <div className="flex gap-2 mb-3 justify-center">
                    <div className="w-1.5 h-1.5 bg-primary/50 rounded-full"></div>
                    <div className="w-1.5 h-1.5 bg-primary/50 rounded-full"></div>
                    <div className="w-1.5 h-1.5 bg-primary/50 rounded-full"></div>
                </div>
                <p>SYSTEM.LOG("© {year} Parth Doshi. Secure Session Terminated.")</p>
            </div>
        </footer>
    );
}
