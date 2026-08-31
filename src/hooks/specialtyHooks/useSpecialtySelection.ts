import { IDoctor } from '@/types/doctor.interface';
import { ISpecialty } from '@/types/specialties.interface';

import { useEffect, useState } from 'react';

interface UseSpecialtySelectionProps {
  doctor?: IDoctor;
  isEdit: boolean;
  open: boolean;
}

interface UseSpecialtySelectionReturn {
  selectedSpecialtyIds: string[];
  removedSpecialtyIds: string[];
  currentSpecialtyId: string;
  setCurrentSpecialtyId: (id: string) => void;
  handleAddSpecialty: () => void;
  handleRemoveSpecialty: (id: string) => void;
  getNewSpecialties: () => string[];
  getAvailableSpecialties: (allSpecialties: ISpecialty[]) => ISpecialty[];
}

export const useSpecialtySelection = ({
  doctor,
  isEdit,
  open,
}: UseSpecialtySelectionProps): UseSpecialtySelectionReturn => {
  console.log('DOCTOR', doctor);

  const getInitialSpecialtyIds = () => {
    if (isEdit && doctor?.doctorSpecialities) {
      return (
        doctor?.doctorSpecialities
          ?.map((ds) => {
            // Try: specialitiesId, specialities.id, or specialties.id
            return ds?.specialtiesId || null;
          })
          ?.filter((id): id is string => !!id) || []
      );
    }
    return [];
  };

  const [selectedSpecialtyIds, setSelectedSpecialtyIds] =
    useState<string[]>(getInitialSpecialtyIds);

  const [removedSpecialtyIds, setRemovedSpecialtyIds] = useState<string[]>([]);
  const [currentSpecialtyId, setCurrentSpecialtyId] = useState<string>('');

  const handleAddSpecialty = () => {
    if (currentSpecialtyId && !selectedSpecialtyIds.includes(currentSpecialtyId)) {
      setSelectedSpecialtyIds([...selectedSpecialtyIds, currentSpecialtyId]);
      // If in edit mode and we're re-adding a removed specialty
      if (removedSpecialtyIds.includes(currentSpecialtyId)) {
        setRemovedSpecialtyIds(removedSpecialtyIds.filter((id) => id !== currentSpecialtyId));
      }
      setCurrentSpecialtyId('');
    }
  };

  const handleRemoveSpecialty = (specialtyId: string) => {
    setSelectedSpecialtyIds(selectedSpecialtyIds.filter((id) => id !== specialtyId));

    // In edit mode, track removed specialties
    if (isEdit && doctor?.doctorSpecialities) {
      const wasOriginalSpecialty = doctor?.doctorSpecialities?.some((ds) => {
        const id = ds?.specialtiesId || null;
        return id === specialtyId;
      });
      if (wasOriginalSpecialty && !removedSpecialtyIds.includes(specialtyId)) {
        setRemovedSpecialtyIds([...removedSpecialtyIds, specialtyId]);
      }
    }
  };

  const getNewSpecialties = (): string[] => {
    if (!isEdit || !doctor?.doctorSpecialities) {
      return selectedSpecialtyIds;
    }
    const originalIds =
      doctor?.doctorSpecialities
        ?.map((ds) => ds?.specialtiesId || null)
        ?.filter((id): id is string => !!id) || [];
    return selectedSpecialtyIds.filter((id) => !originalIds.includes(id));
  };

  const getAvailableSpecialties = (allSpecialties: ISpecialty[]) => {
    return allSpecialties?.filter((s) => !selectedSpecialtyIds?.includes(s?.id)) || [];
  };

  useEffect(() => {
    if (open && doctor) {
      const initialIds = getInitialSpecialtyIds();
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSelectedSpecialtyIds(initialIds);
      setRemovedSpecialtyIds([]);
      setCurrentSpecialtyId('');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, doctor?.id]);

  return {
    selectedSpecialtyIds,
    removedSpecialtyIds,
    currentSpecialtyId,
    setCurrentSpecialtyId,
    handleAddSpecialty,
    handleRemoveSpecialty,
    getNewSpecialties,
    getAvailableSpecialties,
  };
};
