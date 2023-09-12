import { getAllTestItems } from "@/utils/actions";

export default async function Home() {
  const testData = await getAllTestItems();
  return (
    <main>
      <ul>
        {testData.map((item, index) => (
          <li key={index}>{item.name}</li>
        ))}
      </ul>
    </main>
  );
}
