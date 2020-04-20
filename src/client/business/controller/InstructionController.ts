import Instruction from "../../../common/model/Instruction";

class InstructionController {
    getAll = (recipeId : number) => {
        return fetch(`/api/recipes/${recipeId}/instructions/`)
            .then(response => response.json())
            .then((resultArray : any[]) => resultArray.map(Instruction.deserialize));
    }

    get = (id : number) => {
        return fetch(`/api/instructions/${id}/`)
            .then(response => response.json())
            .then((result : any) => Instruction.deserialize(result));
    }
    
    add = (instruction : Instruction) => {
        return fetch(`/api/instructions`, {
                method : "POST",
                body : JSON.stringify(instruction),
                headers: {'Content-Type' : 'application/json'}
            })
            .then(response => response.json())
            .then(Instruction.deserialize);
    }

    delete = (instruction : Instruction) => {
        return fetch(`/api/instructions/${instruction.getId()}`, {
                method : "DELETE"
            });
    }
}
export default new InstructionController();