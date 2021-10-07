using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TestSimpleWebApp.Models;

namespace TestSimpleWebApp.Services
{
    public class ValidatorBuilder<T>
    {
        private ValidationStepTask<T> _firstValidationStepTask;
        private ValidationStepTask<T> _lastValidationStepTask;

        public void addValidationStep(ValidationStep<T> validationStep)
        {
            ValidationStepTask<T> validationStepTask = new ValidationStepTask<T>(validationStep, null);
            if (_firstValidationStepTask == null)
            {
                _firstValidationStepTask = validationStepTask;
            }
            else
            {
                _lastValidationStepTask.NextTask = validationStepTask;
            }
            _lastValidationStepTask = validationStepTask;
        }

        public Validator<T> Build()
        {
            Validator<T> validator = new ValidatorImpl<T>(_firstValidationStepTask);
            _firstValidationStepTask = null;
            _lastValidationStepTask = null;
            return validator;
        }

        private class ValidationStepTask<S>
        {
            private ValidationStep<S> _validationStep;
            public ValidationStepTask<S> NextTask { get;  set; }

            public ValidationStepTask(ValidationStep<S> validationStep, ValidationStepTask<S> nextTask)
            {
                _validationStep = validationStep;
                NextTask = nextTask;
            }

            public void Validate(S entity)
            {
                _validationStep.Validate(entity);
                if (NextTask != null) { NextTask.Validate(entity); };
            }
        }

        private class ValidatorImpl<S> : Validator<S>
        {
            private ValidationStepTask<S> _firstValidationStepTask;

            public ValidatorImpl(ValidationStepTask<S> firstValidationStepTask)
            {
                _firstValidationStepTask = firstValidationStepTask;
            }

            public void Validate(S entity)
            {
                _firstValidationStepTask.Validate(entity);
            }
        }
    }
}
