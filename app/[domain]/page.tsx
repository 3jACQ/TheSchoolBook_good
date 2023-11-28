export default async function SiteHomePage({
    params,
}: {
    params: { domain: string };
}) {
    return (
        <div>
            <h1>Site Home Page</h1>
            <p>Domain: {params.domain}</p>
        </div>
    );
}