import dynamic from "next/dynamic";

const ViewPlants = dynamic(() => import("@/components/view-plants"), {
    ssr: false,
});

export default function Dashboard() {
    return <ViewPlants />;
}
