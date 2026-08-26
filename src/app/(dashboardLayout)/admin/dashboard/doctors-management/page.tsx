import DoctorManagementHeader from '@/components/modules/Admin/DoctorManagement/DoctorManagementHeader';
import DoctorTable from '@/components/modules/Admin/DoctorManagement/DoctorTable';
import RefreshButton from '@/components/shared/RefreshButton';
import SearchFilter from '@/components/shared/SearchFilter';
import SelectFilter from '@/components/shared/SelectFilter';
import TableSkeleton from '@/components/shared/TableSkeleton';
import { getDoctors } from '@/services/admin/doctorManagement';
import { getSpecialties } from '@/services/admin/specialtiesManagement';
import { ISpecialty } from '@/types/specialties.interface';
import { Suspense } from 'react';

const AdminDoctorsManagementPage = async () => {
  const specialtiesResult = await getSpecialties();
  const doctorsResult = await getDoctors('');

  return (
    <div className="space-y-6">
      <DoctorManagementHeader specialities={specialtiesResult.data} />
      <div className="flex space-x-2">
        <SearchFilter paramName="searchTerm" placeholder="Search Doctor..." />
        <SelectFilter
          paramName="specialty"
          options={specialtiesResult?.data?.map((specialty: ISpecialty) => ({
            label: specialty.title,
            value: specialty.title,
          }))}
        />
        <RefreshButton />
      </div>
      <Suspense fallback={<TableSkeleton columns={10} rows={10} />}>
        <DoctorTable specialties={specialtiesResult.data} doctors={doctorsResult.data} />
      </Suspense>
    </div>
  );
};

export default AdminDoctorsManagementPage;
