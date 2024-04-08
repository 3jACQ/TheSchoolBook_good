export default async function SiteHomePage({
    params,
}: {
    params: { postId: string };
}) {
    return (
        <div>
            <p>Page: {params.postId}</p>
        </div>
    );
}