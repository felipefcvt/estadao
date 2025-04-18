export interface NewsProps {
    chapeu: string;
    url: string;
    titulo: string;
    dataHoraPublicacao: Date;
    imagem: string;
    thumbnail: string;
    conteudo: string;
    updatedAt: Date;
}

export class News {
    private props: NewsProps;
    private _id: number;

    constructor(props: Omit<NewsProps, 'updatedAt'>, id?: number) {
        this._id = id ?? 0;
        this.props = {
            ...props,
            updatedAt: new Date(),
        };
    }

    get id() {
        return this._id;
    }

    get chapeu() {
        return this.props.chapeu;
    }

    set chapeu(value: string) {
        this.props.chapeu = value;
    }

    get url() {
        return this.props.url;
    }

    set url(value: string) {
        this.props.url = value;
    }

    get titulo() {
        return this.props.titulo;
    }

    set titulo(value: string) {
        this.props.titulo = value;
    }

    get dataHoraPublicacao() {
        return this.props.dataHoraPublicacao;
    }

    set dataHoraPublicacao(value: Date) {
        this.props.dataHoraPublicacao = value;
    }

    get imagem() {
        return this.props.imagem;
    }

    set imagem(value: string) {
        this.props.imagem = value;
    }

    get thumbnail() {
        return this.props.thumbnail;
    }

    set thumbnail(value: string) {
        this.props.thumbnail = value;
    }

    get conteudo() {
        return this.props.conteudo;
    }

    set conteudo(value: string) {
        this.props.conteudo = value;
    }

    get updatedAt() {
        return this.props.updatedAt;
    }

    private updateTimestamp() {
        this.props.updatedAt = new Date();
    }
}
