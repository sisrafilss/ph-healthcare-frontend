'use client';

import DeleteConfirmationDialog from '@/components/shared/DeleteConfirmationDialog';
import ManagementTable from '@/components/shared/ManagementTable';
import { deleteSpecialty } from '@/services/admin/specialtiesManagement';
import { ISpecialty } from '@/types/specialties.interface';
import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';
import { toast } from 'sonner';
import { specialtiesColumn } from './specialtiesManagement';

interface ISpecialtiesTableProps {
  specialties: ISpecialty[];
}

const SpecialtiesTable = ({ specialties }: ISpecialtiesTableProps) => {
  const [, startTransition] = useTransition();
  const router = useRouter();
  const [deletingSpecialty, setDeletingSpecialty] = useState<ISpecialty | null>(null);
  const [isDeletingDialog, setIsDeletingDialog] = useState(false);

  const handleRefresh = () => {
    startTransition(() => {
      router.refresh();
    });
  };

  const handleDelete = (specialty: ISpecialty) => {
    setDeletingSpecialty(specialty);
  };

  console.log('deleting specialty', deletingSpecialty);

  const confirmDelete = async () => {
    if (!deletingSpecialty) return;

    setIsDeletingDialog(true);
    const result = await deleteSpecialty(deletingSpecialty.id);
    if (result.success) {
      toast.success(result.message || 'Specialty deleted successfully');
      setDeletingSpecialty(null);
      handleRefresh();
      setIsDeletingDialog(false);
    } else {
      toast.error(result.message || 'Failed to delete sepcialty');
      setIsDeletingDialog(false);
    }
  };

  return (
    <>
      <ManagementTable
        data={specialties}
        columns={specialtiesColumn}
        getRowKey={(row) => row.title}
        onDelete={handleDelete}
        emptyMessage="No Specialties Found"
      />

      <DeleteConfirmationDialog
        open={!!deletingSpecialty}
        onOpenChange={(open) => !open && setDeletingSpecialty(null)}
        onConfirm={confirmDelete}
        title="Delete Specialty"
        description={`Are you sure you want to delete ${deletingSpecialty?.title}? This action cannot be undone.`}
        isDeleting={isDeletingDialog}
      />
    </>
  );
};

export default SpecialtiesTable;
