'use client';

import ManagementPageHeader from '@/components/shared/ManagementPageHeader';
import { IDoctor } from '@/types/doctor.interface';
import { ISpecialty } from '@/types/specialties.interface';
import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';
import DoctorFormDialog from './DoctorFormDialog';

interface DoctorManagementHeaderProps {
  doctor?: IDoctor;
  specialities?: ISpecialty[];
}

const DoctorManagementHeader = ({ doctor, specialities }: DoctorManagementHeaderProps) => {
  const router = useRouter();
  const [, startTransition] = useTransition();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleSuccess = () => {
    startTransition(() => {
      router.refresh();
    });
  };

  const [dialogKey, setDialogKey] = useState(0);

  const handleOpenDialog = () => {
    setDialogKey((value) => value + 1);
    setIsDialogOpen(true);
  };
  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  return (
    <>
      <DoctorFormDialog
        key={dialogKey}
        open={isDialogOpen}
        onClose={handleCloseDialog}
        onSuccess={handleSuccess}
        doctor={doctor}
        specialities={specialities}
      />

      <ManagementPageHeader
        title="Doctors Management"
        description="Manage Doctors information and details"
        action={{
          label: 'Add Doctor',
          icon: Plus,
          onClick: handleOpenDialog,
        }}
      />
    </>
  );
};

export default DoctorManagementHeader;
