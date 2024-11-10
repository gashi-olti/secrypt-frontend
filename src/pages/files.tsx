import { FilesComponent } from "@/components/Files";
import { FileProvider } from "@/components/Files/FileProvier";
import Layout from "@/components/Layout";

export default function Files() {
  return (
    <FileProvider>
      <Layout maxWidth="md">
        <FilesComponent />
      </Layout>
    </FileProvider>
  );
}
