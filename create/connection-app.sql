-- public.usuario definition

-- Drop table

-- DROP TABLE public.usuario;

CREATE TABLE public.usuario (
	id bigserial NOT NULL,
	nome varchar NOT NULL,
	email varchar NOT NULL,
	senha varchar NOT NULL,
	created_at timestamp NOT NULL,
	imagem varchar NULL,
	CONSTRAINT usuario_pk PRIMARY KEY (id)
);


-- public.empresa definition

-- Drop table

-- DROP TABLE public.empresa;

CREATE TABLE public.empresa (
	id bigserial NOT NULL,
	nome varchar NOT NULL,
	CONSTRAINT empresa_pk PRIMARY KEY (id)
);


-- public."time" definition

-- Drop table

-- DROP TABLE public."time";

CREATE TABLE public."time" (
	id bigserial NOT NULL,
	nome varchar NULL,
	descricao varchar NULL,
	id_empresa bigserial NOT NULL,
	idresponsavel bigserial NOT NULL,
	CONSTRAINT time_pk PRIMARY KEY (id),
	CONSTRAINT time_fk FOREIGN KEY (idresponsavel) REFERENCES public.usuario(id),
	CONSTRAINT time_fk_1 FOREIGN KEY (id_empresa) REFERENCES public.empresa(id)
);


-- public.usuariotime definition

-- Drop table

-- DROP TABLE public.usuariotime;

CREATE TABLE public.usuariotime (
	id bigserial NOT NULL,
	usuario bigserial NOT NULL,
	"time" bigserial NOT NULL,
	created_at timestamp NULL,
	CONSTRAINT usuariotime_pk PRIMARY KEY (id),
	CONSTRAINT usuariotime_fk FOREIGN KEY (usuario) REFERENCES public.usuario(id),
	CONSTRAINT usuariotime_fk_1 FOREIGN KEY ("time") REFERENCES public."time"(id)
);


-- public.convite definition

-- Drop table

-- DROP TABLE public.convite;

CREATE TABLE public.convite (
	id bigserial NOT NULL,
	usuario bigserial NOT NULL,
	"time" bigserial NOT NULL,
	created_at timestamp NULL,
	CONSTRAINT convite_pk PRIMARY KEY (id),
	CONSTRAINT convite_fk FOREIGN KEY (usuario) REFERENCES public.usuario(id),
	CONSTRAINT convite_fk_1 FOREIGN KEY ("time") REFERENCES public."time"(id)
);


-- public.evento definition

-- Drop table

-- DROP TABLE public.evento;

CREATE TABLE public.evento (
	id bigserial NOT NULL,
	id_adm bigserial NOT NULL,
	"time" bigserial NOT NULL,
	datahora timestamp NULL,
	CONSTRAINT evento_pk PRIMARY KEY (id),
	CONSTRAINT evento_fk FOREIGN KEY (id_adm) REFERENCES public.usuario(id),
	CONSTRAINT evento_fk_1 FOREIGN KEY ("time") REFERENCES public."time"(id)
);