import { SuccessfullyCompiled } from "../../constructs";
import { LocalObjectEntity, LocalReferenceEntity } from "../../entities";
import { CompleteParameterType, ReferenceType } from "../../types";
import { CompiledStorageSpecifier } from "../StorageSpecifier";
import { CompiledTypeSpecifier } from "../TypeSpecifier";
import { ParameterDeclaration } from "./ParameterDeclaration";
import { TypedDeclarator, CompiledDeclarator } from "../Declarator";



export interface ParameterDefinition extends ParameterDeclaration {
    readonly name: string;
    readonly type: CompleteParameterType;
    readonly declaredEntity: LocalObjectEntity | LocalReferenceEntity;
}

export interface TypedParameterDefinition<T extends CompleteParameterType = CompleteParameterType> extends ParameterDeclaration {
    readonly type: T;
    readonly declarator: TypedDeclarator<T>;
    readonly declaredEntity: LocalObjectEntity<Exclude<T, ReferenceType>> | LocalReferenceEntity<Extract<T, ReferenceType>>;
}

export interface CompiledParameterDefinition<T extends CompleteParameterType = CompleteParameterType> extends TypedParameterDefinition<T>, SuccessfullyCompiled {
    readonly typeSpecifier: CompiledTypeSpecifier;
    readonly storageSpecifier: CompiledStorageSpecifier;
    readonly declarator: CompiledDeclarator<T>;
}
