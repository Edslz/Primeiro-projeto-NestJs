import { Body, ConflictException, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { UsuarioRepository } from "./usuario.repository";
import { CriaUsuarioDTO } from "./dto/CriaUsuario.dto";
import { UsuarioEntity } from "./usuario.entity";
import { v4 as uuid } from 'uuid' ;
import { listaUsuarioDTO } from "./dto/ListaUsuario.dto";
import { AtualizaUsuarioDTO } from "./dto/AtualizaUsuario.dto";

@Controller('/usuarios')
export class UsuarioController {

    private usuarioRepository = new UsuarioRepository

    @Post()
    async criaUsuario(@Body() dadosDoUsuario:CriaUsuarioDTO) {
        const usuarioEntity = new UsuarioEntity();
        usuarioEntity.email = dadosDoUsuario.email;
        usuarioEntity.senha = dadosDoUsuario.senha;
        usuarioEntity.nome = dadosDoUsuario.nome;
        usuarioEntity.id = uuid();

        const usuarios = await this.usuarioRepository.listar()

        for(let i = 0 ; i<usuarios.length ; i++){
            if(usuarios[i].email = usuarioEntity.email){
                return {
                    messagem:`Email já cadastrado!!!!`
                }
            }
        }
        



        await this.usuarioRepository.salvar(usuarioEntity)
        return {
             id: new listaUsuarioDTO(usuarioEntity.id, usuarioEntity.nome),
             messagem: 'usuário criado com sucesso'
     }
    }

    @Get ()
    async listaUsuarios() {
        const usuariosSalvos = await this.usuarioRepository.listar();
        const usuariosLista = usuariosSalvos.map(
            usuario => new listaUsuarioDTO(
                usuario.id,
                usuario.nome
            )
        )

        return usuariosLista;
    }

    @Put('/:id')
    async atualizaUsuario(@Param('id') id : string, @Body() novosDados: AtualizaUsuarioDTO) {
        const usuarioAtualizado = await this.usuarioRepository.atualiza(id, novosDados);
        
        return {
            usuario: usuarioAtualizado,
            mesagem: 'usuário atualizado com sucesso!'
        }
    }

    @Delete('/:id')
    async removeUsuario(@Param('id') id: string) {
        const usuarioRemovido = await this.usuarioRepository.remove(id);

        return {
            usuarioRemovido,
            messagem: 'usuário removido com sucesso'
        }
    }
}