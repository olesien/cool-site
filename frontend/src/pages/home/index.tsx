import { NavMenu } from "@/components/NavMenu";

export default function Home() {
    return (
        <div>
            <NavMenu />
            <p>Home Page</p>
            <div>
                <img
                    src="/images/02142133700-e1-removebg-preview.png"
                    alt="Sample"
                    loading="lazy"
                    className="image"
                />
            </div>
        </div>
    );
}
