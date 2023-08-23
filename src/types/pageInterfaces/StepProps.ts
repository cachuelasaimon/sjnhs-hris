import { Dispatch, SetStateAction } from 'react';

export interface StepProps {
  setStep: Dispatch<SetStateAction<number>>;
  step: number;
  activeStep: number;
}
