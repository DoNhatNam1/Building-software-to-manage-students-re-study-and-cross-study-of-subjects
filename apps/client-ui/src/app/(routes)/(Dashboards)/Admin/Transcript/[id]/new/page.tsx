
import AdminTranscriptAddNewScreen from "@/screens/AdminTranscriptAddNewScreen";

export default function Page({ params }: { params: { id: string } }) {
  return (
    <>
    <AdminTranscriptAddNewScreen
      idSinhVien = {params.id}
    />
    
    </>
  );
}