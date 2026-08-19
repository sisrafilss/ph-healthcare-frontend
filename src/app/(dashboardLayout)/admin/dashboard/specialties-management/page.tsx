import SpecialtiesManagementHeader from '@/components/modules/Admin/SpecialtiesManagement/SpecialtiesManagementHeader';
import RefreshButton from '@/components/shared/RefreshButton';

const SpecialtiesManagementPage = () => {
  return (
    <div className="space-y-6">
      <SpecialtiesManagementHeader />
      <div className="flex">
        <RefreshButton />
      </div>
      {/* <Suspense fallback={<TableSkeleton columns={2} rows={10} />}>
        <SpecialitiesTable specialities={result.data} />
      </Suspense> */}
    </div>
  );
};

export default SpecialtiesManagementPage;
