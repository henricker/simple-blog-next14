import { db } from "@/db";
import { paths } from "@/paths";
import { Chip } from "@nextui-org/react";
import Link from "next/link";


export default async function TopicList() {
    const topics = await db.topic.findMany()
    const renderedeTopics = topics.map(tp => (
        <div key={tp.id}>
            <Link href={paths.topicShow(tp.slug)}>
                <Chip color="warning" variant="shadow">{tp.slug}</Chip>
            </Link>
        </div>
    ))

    return <div className="flex flex-row flex-wrap gap-2">
        {renderedeTopics}
    </div>
}