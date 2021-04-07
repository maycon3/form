import { FormArray, FormControl, FormGroup } from '@angular/forms';

export class FormValidations {

    static requiredMinCheckbox(min = 1) {
        const validator = (formArray:FormArray)=>{
            //estilo de programação programatico
            /*const value = formArray.controls;
            let totalCheckded = 0;
            for(let i = 0; i<value.length; i++){
                if(value[i].value){
                    totalCheckded += 1;
                }
            }*/
            //estilo de programação funcional(função)
            const totalCheckded = formArray.controls
                .map(v => v.value)
                .reduce((total,current) => current ? total + current : total, 0 );
                return totalCheckded >= min ? null : { required: true};
        };
        return validator;
    }

    static equalsTo(otherField:string){
        const validator = (formControl:FormControl)=>{
            if(otherField == null){
                throw new Error('É necessario informar um campo.');
            }

            if(!formControl.root ||!(<FormGroup>formControl.root).controls){
                return null;
            }

            const field = (<FormGroup>formControl.root).get(otherField);
            
            if(!field){
                throw new Error('É necessario informar um campo válido.');
            }

            if(field.value !== formControl.value){
                return { equalsTo: otherField };
            }
            return null;
        };
        return validator;
    }

    static getErrorMsg(fieldName:string, validatorName:string, validatorValue?:any){
        const config = {
            'required': `${fieldName} é obrigatório.`,
            'minlength': `${fieldName} precisa ter no mínimo ${validatorValue.requiredLength} caracteres.`,
            'email':`O campo ${fieldName} está invalido `,
            'equalsTo': `${fieldName} não são iguais.`
        }
        return config[validatorName];
    }
}