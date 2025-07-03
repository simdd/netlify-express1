export const dynamic = "force-dynamic";

export default async function Home() {
  async function fn() {
    // Fetch data from external API
    const res = await fetch(`https://api.edgeone.ai/e-func/ip/isCN`);

    const jq = await fetch(
      "https://static.cloudcachetci.com/qcloud/main/scripts/release/common/vendors/jquery-3.2.1.min.js"
    );

    const data = await res.json();

    const jqdata = await jq.text();

    // Pass data to the page via props
    return { data, jqdata };
  }

  const var1 = await fn();

  return (
    <div>
      sim
      <p>{JSON.stringify(var1)}</p>
    </div>
  );
}
