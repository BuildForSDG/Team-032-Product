CREATE SEQUENCE auth_id_seq;
CREATE TABLE
IF NOT EXISTS auth
(
    id integer NOT NULL DEFAULT nextval
('"auth_id_seq"'::regclass),
    email character varying
(100) COLLATE pg_catalog."default" NOT NULL, 
    password character varying
(1024) COLLATE pg_catalog."default" NOT NULL, 
    date_created timestamp
with time zone NOT NULL, 
    date_modified timestamp
with time zone NOT NULL, 
    CONSTRAINT auth_pkey PRIMARY KEY
(id), 
    CONSTRAINT auth_email_key UNIQUE
(email)
)


CREATE SEQUENCE communities_id_seq;
CREATE TABLE
IF NOT EXISTS communities
(
    id integer NOT NULL DEFAULT nextval
('"communities_id_seq"'::regclass),
    name character varying
(30) COLLATE pg_catalog."default" NOT NULL,
    town character varying
(30) COLLATE pg_catalog."default" NOT NULL,
    lga character varying
(30) COLLATE pg_catalog."default" NOT NULL,
    state character varying
(30) COLLATE pg_catalog."default" NOT NULL,
    country character varying
(30) COLLATE pg_catalog."default" NOT NULL,
    total_population integer NOT NULL,
    children_population integer,
    youth_population integer,
    middle_aged_population integer,
    elderly_population integer,
    date_created timestamp
with time zone NOT NULL,
    date_modified timestamp
with time zone NOT NULL,
    CONSTRAINT communities_pkey PRIMARY KEY
(id)
)


CREATE SEQUENCE community_subjects_needed_id_seq;
CREATE TABLE
IF NOT EXISTS community_subjects_needed
(
    id integer NOT NULL DEFAULT nextval
('"community_subjects_needed_id_seq"'::regclass),
    community_id integer NOT NULL,
    subject_id integer NOT NULL,
    covered boolean NOT NULL,
    date_created timestamp
with time zone NOT NULL,
    CONSTRAINT community_subjects_needed_pkey PRIMARY KEY
(id),
    CONSTRAINT community_subjects_needed_community_id_fkey FOREIGN KEY
(community_id)
        REFERENCES public.communities
(id) MATCH SIMPLE
        ON
UPDATE CASCADE
        ON
DELETE CASCADE
        NOT VALID,
    CONSTRAINT community_subjects_needed_subject_id_fkey
FOREIGN KEY
(subject_id)
        REFERENCES public.subjects
(id) MATCH SIMPLE
        ON
UPDATE CASCADE
        ON
DELETE CASCADE
        NOT VALID
)


CREATE SEQUENCE institutes_id_seq;
CREATE TABLE
IF NOT EXISTS institutes
(
    id integer NOT NULL DEFAULT nextval
('"institutes_id_seq"'::regclass),
    name character varying
(100) COLLATE pg_catalog."default" NOT NULL,
    country character varying
(30) COLLATE pg_catalog."default" NOT NULL,
    state character varying
(30) COLLATE pg_catalog."default" NOT NULL,
    lga character varying
(30) COLLATE pg_catalog."default" NOT NULL,
    address character varying
(100) COLLATE pg_catalog."default" NOT NULL,
    date_created timestamp
with time zone NOT NULL,
    date_modified timestamp
with time zone NOT NULL,
    CONSTRAINT institutes_pkey PRIMARY KEY
(id)
)


CREATE SEQUENCE subjects_id_seq;
CREATE TABLE
IF NOT EXISTS subjects
(
    id integer NOT NULL DEFAULT nextval
('"subjects_id_seq"'::regclass),
    name character varying
(30) COLLATE pg_catalog."default" NOT NULL,
    description text COLLATE pg_catalog."default" NOT NULL,
    date_created timestamp
with time zone NOT NULL,
    date_modified timestamp
with time zone NOT NULL,
    CONSTRAINT subjects_pkey PRIMARY KEY
(id)
)


CREATE SEQUENCE teacher_subjects_id_seq;
CREATE TABLE
IF NOT EXISTS teacher_subjects
(
    id integer NOT NULL DEFAULT nextval
('"teacher_subjects_id_seq"'::regclass),
    teacher_id integer NOT NULL,
    subject_id integer NOT NULL,
    verified boolean NOT NULL DEFAULT false,
    date_created timestamp
with time zone NOT NULL,
    CONSTRAINT teacher_subjects_pkey PRIMARY KEY
(id),
    CONSTRAINT teacher_subjects_subject_id_fkey FOREIGN KEY
(subject_id)
        REFERENCES public.subjects
(id) MATCH SIMPLE
        ON
UPDATE CASCADE
        ON
DELETE CASCADE
        NOT VALID,
    CONSTRAINT teacher_subjects_teacher_id_fkey
FOREIGN KEY
(teacher_id)
        REFERENCES public.teachers
(id) MATCH SIMPLE
        ON
UPDATE CASCADE
        ON
DELETE CASCADE
        NOT VALID
)


CREATE SEQUENCE teachers_id_seq;
CREATE TABLE
IF NOT EXISTS teachers
(
    id integer NOT NULL DEFAULT nextval
('"teachers_id_seq"'::regclass),
    email character varying
(100) COLLATE pg_catalog."default" NOT NULL,
    phone character varying
(20) COLLATE pg_catalog."default" NOT NULL,
    country character varying
(30) COLLATE pg_catalog."default" NOT NULL,
    state character varying
(30) COLLATE pg_catalog."default" NOT NULL,
    lga character varying
(30) COLLATE pg_catalog."default" NOT NULL,
    town character varying
(30) COLLATE pg_catalog."default" NOT NULL,
    deployed boolean NOT NULL DEFAULT false,
    date_created timestamp
with time zone NOT NULL,
    date_modified timestamp
with time zone NOT NULL,
    level_of_education_id integer NOT NULL,
    CONSTRAINT teachers_pkey PRIMARY KEY
(id),
    CONSTRAINT teacher_email_key UNIQUE
(email)
,
    CONSTRAINT teacher_phone_key UNIQUE
(phone)

)


CREATE SEQUENCE trainer_subjects_id_seq;
CREATE TABLE
IF NOT EXISTS trainer_subjects
(
    id integer NOT NULL DEFAULT nextval
('"trainer_subjects_id_seq"'::regclass),
    trainer_id integer NOT NULL,
    subject_id integer NOT NULL,
    date_created timestamp
with time zone NOT NULL,
    CONSTRAINT trainer_subjects_pkey PRIMARY KEY
(id),
    CONSTRAINT trainer_subjects_subject_id_fkey FOREIGN KEY
(subject_id)
        REFERENCES public.subjects
(id) MATCH SIMPLE
        ON
UPDATE CASCADE
        ON
DELETE CASCADE
        NOT VALID,
    CONSTRAINT trainer_subjects_trainer_id_fkey
FOREIGN KEY
(trainer_id)
        REFERENCES public.trainers
(id) MATCH SIMPLE
        ON
UPDATE CASCADE
        ON
DELETE CASCADE
        NOT VALID
)


CREATE SEQUENCE trainers_id_seq;
CREATE TABLE
IF NOT EXISTS trainers
(
    id integer NOT NULL DEFAULT nextval
('"trainers_id_seq"'::regclass),
    email character varying
(100) COLLATE pg_catalog."default" NOT NULL,
    phone character varying
(20) COLLATE pg_catalog."default" NOT NULL,
    country character varying
(30) COLLATE pg_catalog."default" NOT NULL,
    state character varying
(30) COLLATE pg_catalog."default" NOT NULL,
    lga character varying
(30) COLLATE pg_catalog."default" NOT NULL,
    town character varying
(30) COLLATE pg_catalog."default" NOT NULL,
    institute_id integer NOT NULL,
    date_created timestamp
with time zone NOT NULL,
    date_modified timestamp
with time zone NOT NULL,
    CONSTRAINT trainers_pkey PRIMARY KEY
(id),
    CONSTRAINT trainer_email_key UNIQUE
(email)
,
    CONSTRAINT trainer_phone_key UNIQUE
(phone)
,
    CONSTRAINT trainers_institute_id_fkey FOREIGN KEY
(institute_id)
        REFERENCES public.institutes
(id) MATCH SIMPLE
        ON
UPDATE CASCADE
        ON
DELETE CASCADE
        NOT VALID
)
