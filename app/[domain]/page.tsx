export default async function SiteHomePage({
    params,
}: {
    params: { domain: string };
}) {
    return (
        <div>
            <p>User: {params.domain}</p>
        </div>
    );
}