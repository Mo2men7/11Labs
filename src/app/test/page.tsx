import prisma from "@/lib/db";

export default async function TestPage() {
  const voices = await prisma.voice.findMany();

  return (
    <div className="p-4">
      <h1>Voices {voices.length}</h1>
      <ul>
        {voices.map((voice) => (
          <li key={voice.id} className="text-muted-foreground">
            {voice.name} - {voice.category}
          </li>
        ))}
      </ul>
    </div>
  );
}
