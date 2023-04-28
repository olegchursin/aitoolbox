import DataGrid from '@/components/DataGrid';
import Layout from '@/components/layout/Layout';

const Vault = () => {
  return (
    <Layout>
      <div className="layout py-12">
        <div className="prose-l prose lg:prose-xl">
          <h1>Vault</h1>
        </div>

        <DataGrid />
      </div>
    </Layout>
  );
};

export default Vault;
