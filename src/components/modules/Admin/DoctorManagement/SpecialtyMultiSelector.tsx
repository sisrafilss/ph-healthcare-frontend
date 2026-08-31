'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Field, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ISpecialty } from '@/types/specialties.interface';
import { X } from 'lucide-react';

interface SpecialtyMultiSelectProps {
  selectedSpecialtyIds: string[];
  removedSpecialtyIds: string[];
  currentSpecialtyId: string;
  availableSpecialties: ISpecialty[];
  isEdit: boolean;
  onCurrentSpecialtyChange: (id: string) => void;
  onAddSpecialty: () => void;
  onRemoveSpecialty: (id: string) => void;
  getSpecialtyTitle: (id: string) => string;
  getNewSpecialties: () => string[];
}

const SpecialtyMultiSelector = ({
  selectedSpecialtyIds,
  removedSpecialtyIds,
  currentSpecialtyId,
  availableSpecialties,
  isEdit,
  onCurrentSpecialtyChange,
  onAddSpecialty,
  onRemoveSpecialty,
  getSpecialtyTitle,
  getNewSpecialties,
}: SpecialtyMultiSelectProps) => {
  return (
    <Field>
      <FieldLabel htmlFor="specialties">Specialties (Required)</FieldLabel>

      {/* Hidden Inputs for Form Submission */}
      <Input
        type="hidden"
        name="specialties"
        value={JSON.stringify(isEdit ? getNewSpecialties() : selectedSpecialtyIds)}
      />
      {isEdit && (
        <Input type="hidden" name="removeSpecialties" value={JSON.stringify(removedSpecialtyIds)} />
      )}

      {/* Selected Specialties Display */}
      {selectedSpecialtyIds?.length > 0 && (
        <div className="bg-muted mb-3 flex flex-wrap gap-2 rounded-lg p-3">
          {selectedSpecialtyIds?.map((id) => (
            <Badge key={id} variant="secondary" className="px-3 py-1.5 text-sm">
              {getSpecialtyTitle(id)}
              <Button
                variant="link"
                onClick={() => onRemoveSpecialty(id)}
                className="hover:text-destructive ml-2"
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          ))}
        </div>
      )}

      {/* Add Specialty Selector */}
      <div className="flex gap-2">
        <Select value={currentSpecialtyId} onValueChange={onCurrentSpecialtyChange}>
          <SelectTrigger className="flex-1">
            <SelectValue placeholder="Select a specialty to add" />
          </SelectTrigger>
          <SelectContent>
            {availableSpecialties?.length > 0 ? (
              availableSpecialties?.map((specialty) => (
                <SelectItem key={specialty?.id} value={specialty?.id}>
                  {specialty?.title}
                </SelectItem>
              ))
            ) : (
              <SelectItem value="none" disabled>
                {selectedSpecialtyIds?.length > 0
                  ? 'All specialties selected'
                  : 'No specialties available'}
              </SelectItem>
            )}
          </SelectContent>
        </Select>
        <Button
          type="button"
          onClick={onAddSpecialty}
          disabled={!currentSpecialtyId}
          variant="outline"
        >
          Add
        </Button>
      </div>

      <p className="mt-1 text-xs text-gray-500">
        {isEdit
          ? 'Add new specialties or remove existing ones'
          : 'Select at least one specialty for the doctor'}
      </p>

      {/* Edit Mode: Show Changes */}
      {isEdit && (
        <div className="mt-2 space-y-1">
          {getNewSpecialties()?.length > 0 && (
            <p className="text-xs text-green-600">
              ✓ Will add: {getNewSpecialties()?.map(getSpecialtyTitle)?.join(', ')}
            </p>
          )}
          {removedSpecialtyIds?.length > 0 && (
            <p className="text-xs text-red-600">
              ✗ Will remove: {removedSpecialtyIds?.map(getSpecialtyTitle)?.join(', ')}
            </p>
          )}
        </div>
      )}
    </Field>
  );
};

export default SpecialtyMultiSelector;
