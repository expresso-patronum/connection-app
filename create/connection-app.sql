-- public.usuario definition

-- Drop table

-- DROP TABLE public.usuario;

CREATE TABLE public.usuario (
	nome varchar NOT NULL,
	email varchar NOT NULL,
	senha varchar NOT NULL,
	created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	imagem varchar NULL,
	CONSTRAINT usuario_pk PRIMARY KEY (email)
);


-- public.empresa definition

-- Drop table

-- DROP TABLE public.empresa;

CREATE TABLE public.empresa (
	id bigserial NOT NULL,
	nome varchar NOT NULL,
	chefe varchar NOT NULL,
	CONSTRAINT empresa_pk PRIMARY KEY (id),
	CONSTRAINT empresa_fk FOREIGN KEY (chefe) REFERENCES public.usuario(email)
);


-- public."time" definition

-- Drop table

-- DROP TABLE public."time";

CREATE TABLE public."time" (
	id bigserial NOT NULL,
	nome varchar NULL,
	descricao varchar NULL,
	id_empresa bigserial NOT NULL,
	emailresponsavel varchar NOT NULL,
	CONSTRAINT time_pk PRIMARY KEY (id),
	CONSTRAINT time_fk FOREIGN KEY (emailresponsavel) REFERENCES public.usuario(email),
	CONSTRAINT time_fk_1 FOREIGN KEY (id_empresa) REFERENCES public.empresa(id)
);


-- public.usuariotime definition

-- Drop table

-- DROP TABLE public.usuariotime;

CREATE TABLE public.usuariotime (
	id bigserial NOT NULL,
	usuario varchar NOT NULL,
	"time" bigserial NOT NULL,
	created_at timestamp NULL DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT usuariotime_pk PRIMARY KEY (id),
	CONSTRAINT usuariotime_fk FOREIGN KEY (usuario) REFERENCES public.usuario(email),
	CONSTRAINT usuariotime_fk_1 FOREIGN KEY ("time") REFERENCES public."time"(id)
);


-- public.convite definition

-- Drop table

-- DROP TABLE public.convite;

CREATE TABLE public.convite (
	id bigserial NOT NULL,
	usuario varchar NOT NULL,
	"time" bigserial NOT NULL,
	created_at timestamp NULL DEFAULT CURRENT_TIMESTAMP,
	ativo bool NOT NULL,
	CONSTRAINT convite_pk PRIMARY KEY (id),
	CONSTRAINT convite_fk FOREIGN KEY (usuario) REFERENCES public.usuario(email),
	CONSTRAINT convite_fk_1 FOREIGN KEY ("time") REFERENCES public."time"(id)
);


-- public.evento definition

-- Drop table

-- DROP TABLE public.evento;

CREATE TABLE public.evento (
	id bigserial NOT NULL,
	email_adm varchar NOT NULL,
	"time" bigserial NOT NULL,
	datahora timestamp NULL,
	CONSTRAINT evento_pk PRIMARY KEY (id),
	CONSTRAINT evento_fk FOREIGN KEY (email_adm) REFERENCES public.usuario(email),
	CONSTRAINT evento_fk_1 FOREIGN KEY ("time") REFERENCES public."time"(id)
);