import Form from "@/components/form";

export default async function Home({ searchParams }) {
  const { mode } = await searchParams;
  const formMode = mode || 'login';

  return (
    <Form mode={formMode} />
  );
}
