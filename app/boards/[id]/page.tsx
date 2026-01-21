import BoardDetail from "@/src/components/board/board-detail";

interface BoardDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function BoardDetailPage({ params }: BoardDetailPageProps) {
  const { id } = await params;

  return (<BoardDetail id={Number(id)} />);
}
