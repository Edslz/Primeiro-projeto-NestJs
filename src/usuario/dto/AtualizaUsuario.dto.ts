import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";
import { EmailEhUnico } from "../validação/email-eh-unico.validator";

export class AtualizaUsuarioDTO {
   
    @IsNotEmpty({message: 'O nome não pode ser vazio'})
    @IsOptional()
    nome: string;

    @IsEmail(undefined, {message: 'O e-mail informado é inválido'})
    @EmailEhUnico({message: 'Já existe um usúario com esse Email'})
    @IsOptional()
    email: string;

    @MinLength(6, {message: 'A senha deve ter no mínimo 6 caracteres'})
    @IsOptional()
    senha: string;
}