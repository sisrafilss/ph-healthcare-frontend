'use client';

import DeleteConfirmationDialog from '@/components/shared/DeleteConfirmationDialog';
import ManagementTable from '@/components/shared/ManagementTable';
import { softDeleteDoctor } from '@/services/admin/doctorManagement';
import { IDoctor } from '@/types/doctor.interface';
import { ISpecialty } from '@/types/specialties.interface';
import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';
import { toast } from 'sonner';
import { doctorsColumns } from './doctorColumn';

interface DoctorsTableProps {
  doctors: IDoctor[];
  specialties: ISpecialty[];
}

const DoctorTable = ({ doctors, specialties }: DoctorsTableProps) => {
  const [, startTransition] = useTransition();
  const router = useRouter();
  const [deletingDoctor, setDeletingDoctor] = useState<IDoctor | null>(null);
  const [isDeletingDialog, setIsDeletingDialog] = useState(false);

  const handleRefresh = () => {
    startTransition(() => {
      router.refresh();
    });
  };

  const handleDelete = (doctor: IDoctor) => {
    setDeletingDoctor(doctor);
  };

  const confirmDelete = async () => {
    if (!deletingDoctor) return;

    setIsDeletingDialog(true);
    const result = await softDeleteDoctor(deletingDoctor.id!);
    if (result.success) {
      toast.success(result.message || 'Doctor deleted successfully');
      setDeletingDoctor(null);
      handleRefresh();
      setIsDeletingDialog(false);
    } else {
      toast.error(result.message || 'Failed to delete doctor');
      setIsDeletingDialog(false);
    }
  };

  return (
    <>
      <ManagementTable
        data={doctors}
        columns={doctorsColumns}
        getRowKey={(row) => row.name}
        onDelete={handleDelete}
        emptyMessage="No Specialties Found"
      />

      <DeleteConfirmationDialog
        open={!!deletingDoctor}
        onOpenChange={(open) => !open && setDeletingDoctor(null)}
        onConfirm={confirmDelete}
        title="Delete Doctor"
        description={`Are you sure you want to delete ${deletingDoctor?.name}? This action cannot be undone.`}
        isDeleting={isDeletingDialog}
      />
    </>
  );
};

export default DoctorTable;
