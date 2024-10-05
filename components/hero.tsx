import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Component() {
    return (
        <section className="w-full py-8 md:py-12 lg:py-16 xl:py-24 bg-background">
            <div className="container px-4 md:px-6">
                <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
                    <div className="flex flex-col justify-center space-y-4">
                        <div className="space-y-2">
                            <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                                Species Assessment Mapper (SAM)
                            </h1>
                            <p className="max-w-[600px] text-muted-foreground md:text-xl">
                                Revolutionizing invasive species detection and
                                management in Singapore's parks
                            </p>
                        </div>
                        <div className="flex flex-col gap-2 min-[400px]:flex-row">
                            <Link href="/dashboard">
                                <Button size="lg">Visit Dashboard</Button>
                            </Link>
                            <Link href="#features">
                                <Button variant="outline" size="lg">
                                    Learn More
                                </Button>
                            </Link>
                        </div>
                    </div>
                    <div className="flex items-center justify-center">
                        <Image
                            alt="SAM Robot"
                            className="aspect-[4/3] overflow-hidden rounded-xl object-cover object-center"
                            height="400"
                            src="https://i.redd.it/jq6l5lqqhfxa1.jpg"
                            width="600"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
