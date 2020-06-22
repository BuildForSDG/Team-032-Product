-- Create tables

CREATE SEQUENCE auth_id_seq;
CREATE TABLE
IF NOT EXISTS auth
(
    id integer NOT NULL DEFAULT nextval('"auth_id_seq"'::regclass),
    email character varying(100) COLLATE pg_catalog."default" NOT NULL, 
    password character varying(1024) COLLATE pg_catalog."default" NOT NULL, 
    date_created timestamp
with time zone NOT NULL, 
    date_modified timestamp
with time zone NOT NULL, 
    CONSTRAINT auth_pkey PRIMARY KEY(id), 
    CONSTRAINT auth_email_key UNIQUE(email)
);


CREATE SEQUENCE communities_id_seq;
CREATE TABLE
IF NOT EXISTS communities
(
    id integer NOT NULL DEFAULT nextval('"communities_id_seq"'::regclass),
    "name" character varying(30) COLLATE pg_catalog."default" NOT NULL,
    town character varying(30) COLLATE pg_catalog."default" NOT NULL,
    lga character varying(30) COLLATE pg_catalog."default" NOT NULL,
    state character varying(30) COLLATE pg_catalog."default" NOT NULL,
    country character varying(30) COLLATE pg_catalog."default" NOT NULL,
    total_population integer NOT NULL,
    children_population integer,
    youth_population integer,
    middle_aged_population integer,
    elderly_population integer,
    date_created timestamp with time zone NOT NULL,
    date_modified timestamp with time zone NOT NULL,
    CONSTRAINT communities_pkey PRIMARY KEY(id)
);


CREATE SEQUENCE subjects_id_seq;
CREATE TABLE
IF NOT EXISTS subjects
(
    id integer NOT NULL DEFAULT nextval('"subjects_id_seq"'::regclass),
    "name" character varying(30) COLLATE pg_catalog."default" NOT NULL,
    description text COLLATE pg_catalog."default" NOT NULL,
    date_created timestamp with time zone NOT NULL,
    date_modified timestamp with time zone NOT NULL,
    CONSTRAINT subjects_pkey PRIMARY KEY(id)
);


CREATE SEQUENCE community_subjects_needed_id_seq;
CREATE TABLE
IF NOT EXISTS community_subjects_needed
(
    id integer NOT NULL DEFAULT nextval('"community_subjects_needed_id_seq"'::regclass),
    community_id integer NOT NULL,
    subject_id integer NOT NULL,
    covered boolean NOT NULL,
    date_created timestamp with time zone NOT NULL,
    CONSTRAINT community_subjects_needed_pkey PRIMARY KEY(id),
    CONSTRAINT community_subjects_needed_community_id_fkey FOREIGN KEY(community_id)
        REFERENCES public.communities(id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE CASCADE
        NOT VALID,
    CONSTRAINT community_subjects_needed_subject_id_fkey FOREIGN KEY(subject_id)
        REFERENCES public.subjects(id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE CASCADE
        NOT VALID
);


CREATE SEQUENCE institutes_id_seq;
CREATE TABLE
IF NOT EXISTS institutes
(
    id integer NOT NULL DEFAULT nextval('"institutes_id_seq"'::regclass),
    "name" character varying(100) COLLATE pg_catalog."default" NOT NULL,
    country character varying(30) COLLATE pg_catalog."default" NOT NULL,
    "state" character varying(30) COLLATE pg_catalog."default" NOT NULL,
    lga character varying(30) COLLATE pg_catalog."default" NOT NULL,
    address character varying(100) COLLATE pg_catalog."default" NOT NULL,
    date_created timestamp with time zone NOT NULL,
    date_modified timestamp with time zone NOT NULL,
    CONSTRAINT institutes_pkey PRIMARY KEY(id),
    CONSTRAINT institutes_name_country_key UNIQUE (name, country)
);


CREATE SEQUENCE levels_of_education_id_seq;
CREATE TABLE
IF NOT EXISTS levels_of_education
(
    id INTEGER NOT NULL DEFAULT nextval('levels_of_education_id_seq'::regclass),
    "name" CHARACTER VARYING(30) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT levels_of_education_pkey PRIMARY KEY (id),
    CONSTRAINT level_of_education_name_key UNIQUE ("name"),
    date_created timestamp with time zone NOT NULL,
    date_modified timestamp with time zone NOT NULL
);


CREATE SEQUENCE teachers_id_seq;
CREATE TABLE
IF NOT EXISTS teachers
(
    id integer NOT NULL DEFAULT nextval('teachers_id_seq'::regclass),
    email character varying(100) COLLATE pg_catalog."default" NOT NULL,
    phone character varying(20) COLLATE pg_catalog."default" NOT NULL,
    country character varying(30) COLLATE pg_catalog."default" NOT NULL,
    "state" character varying(30) COLLATE pg_catalog."default" NOT NULL,
    lga character varying(30) COLLATE pg_catalog."default" NOT NULL,
    town character varying(30) COLLATE pg_catalog."default" NOT NULL,
    deployed boolean NOT NULL DEFAULT false,
    date_created timestamp with time zone NOT NULL,
    date_modified timestamp with time zone NOT NULL,
    level_of_education_id integer NOT NULL,
    CONSTRAINT teachers_pkey PRIMARY KEY (id),
    CONSTRAINT teacher_email_key UNIQUE (email),
    CONSTRAINT teacher_phone_key UNIQUE (phone),
    CONSTRAINT teachers_email_fkey FOREIGN KEY (email)
        REFERENCES public.auth (email) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE CASCADE
        NOT VALID,
    CONSTRAINT teachers_levels_of_education_id_fkey FOREIGN KEY (levels_of_education_id)
        REFERENCES public.levels_of_education (id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE CASCADE
        NOT VALID
);


CREATE SEQUENCE teacher_subjects_id_seq;
CREATE TABLE
IF NOT EXISTS teacher_subjects
(
    id integer NOT NULL DEFAULT nextval('"teacher_subjects_id_seq"'::regclass),
    teacher_id integer NOT NULL,
    subject_id integer NOT NULL,
    verified boolean NOT NULL DEFAULT false,
    date_created timestamp with time zone NOT NULL,
    CONSTRAINT teacher_subjects_pkey PRIMARY KEY(id),
    CONSTRAINT teacher_subjects_subject_id_fkey FOREIGN KEY(subject_id)
        REFERENCES public.subjects(id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE CASCADE
        NOT VALID,
    CONSTRAINT teacher_subjects_teacher_id_fkey FOREIGN KEY(teacher_id)
        REFERENCES public.teachers(id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE CASCADE
        NOT VALID
);


CREATE SEQUENCE trainers_id_seq;
CREATE TABLE
IF NOT EXISTS trainers
(
    id integer NOT NULL DEFAULT nextval('trainers_id_seq'::regclass),
    email character varying(100) COLLATE pg_catalog."default" NOT NULL,
    phone character varying(20) COLLATE pg_catalog."default" NOT NULL,
    country character varying(30) COLLATE pg_catalog."default" NOT NULL,
    state character varying(30) COLLATE pg_catalog."default" NOT NULL,
    lga character varying(30) COLLATE pg_catalog."default" NOT NULL,
    town character varying(30) COLLATE pg_catalog."default" NOT NULL,
    institute_id integer NOT NULL,
    date_created timestamp with time zone NOT NULL,
    date_modified timestamp with time zone NOT NULL,
    CONSTRAINT trainers_pkey PRIMARY KEY (id),
    CONSTRAINT trainer_email_key UNIQUE (email),
    CONSTRAINT trainer_phone_key UNIQUE (phone),
    CONSTRAINT trainers_email_fkey FOREIGN KEY (email)
        REFERENCES public.auth (email) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE CASCADE
        NOT VALID,
    CONSTRAINT trainers_institute_id_fkey FOREIGN KEY (institute_id)
        REFERENCES public.institutes (id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE CASCADE
        NOT VALID
);


CREATE SEQUENCE trainer_subjects_id_seq;
CREATE TABLE
IF NOT EXISTS trainer_subjects
(
    id integer NOT NULL DEFAULT nextval('"trainer_subjects_id_seq"'::regclass),
    trainer_id integer NOT NULL,
    subject_id integer NOT NULL,
    date_created timestamp with time zone NOT NULL,
    CONSTRAINT trainer_subjects_pkey PRIMARY KEY(id),
    CONSTRAINT trainer_subjects_subject_id_fkey FOREIGN KEY(subject_id)
        REFERENCES public.subjects(id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE CASCADE
        NOT VALID,
    CONSTRAINT trainer_subjects_trainer_id_fkey FOREIGN KEY(trainer_id)
        REFERENCES public.trainers(id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE CASCADE
        NOT VALID
);


-- Create functions


CREATE FUNCTION public.date_time_created_stamp()
    RETURNS trigger
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE NOT LEAKPROOF
AS $BODY$BEGIN
	NEW.date_created := CURRENT_TIMESTAMP;
	RETURN NEW;
END;$BODY$;

COMMENT ON FUNCTION public.date_time_created_stamp()
    IS 'Time stamp to track the date and time of creation of a table row data';


CREATE FUNCTION public.date_time_modified_stamp()
    RETURNS trigger
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE NOT LEAKPROOF
AS $BODY$BEGIN
	NEW.date_modified := CURRENT_TIMESTAMP;
	RETURN NEW;
END;$BODY$;

COMMENT ON FUNCTION public.date_time_modified_stamp()
    IS 'Time stamp to track the date and time of modification of a table row data';


-- Create triggers


CREATE TRIGGER auth_date_time_created_stamp
    BEFORE INSERT
    ON public.auth
    FOR EACH ROW
    EXECUTE PROCEDURE public.date_time_created_stamp();

COMMENT ON TRIGGER auth_date_time_created_stamp ON public.auth
    IS 'Date and time of creation of an authorized app user';


CREATE TRIGGER auth_date_time_modified_stamp
    BEFORE INSERT OR UPDATE 
    ON public.auth
    FOR EACH ROW
    EXECUTE PROCEDURE public.date_time_modified_stamp();

COMMENT ON TRIGGER auth_date_time_modified_stamp ON public.auth
    IS 'Date and time of modification of an authorized app user';


CREATE TRIGGER communities_date_time_created_stamp
    BEFORE INSERT
    ON public.communities
    FOR EACH ROW
    EXECUTE PROCEDURE public.date_time_created_stamp();

COMMENT ON TRIGGER communities_date_time_created_stamp ON public.communities
    IS 'Date and time of creation of a registered community';


CREATE TRIGGER communities_date_time_modified_stamp
    BEFORE INSERT OR UPDATE 
    ON public.communities
    FOR EACH ROW
    EXECUTE PROCEDURE public.date_time_modified_stamp();

COMMENT ON TRIGGER communities_date_time_modified_stamp ON public.communities
    IS 'Date and time of modification of a registered community';


CREATE TRIGGER community_subjects_date_time_created_stamp
    BEFORE INSERT
    ON public.community_subjects_needed
    FOR EACH ROW
    EXECUTE PROCEDURE public.date_time_created_stamp();

COMMENT ON TRIGGER community_subjects_date_time_created_stamp ON public.community_subjects_needed
    IS 'Date and time of creation of a needed community subject';


CREATE TRIGGER institutes_date_time_created_stamp
    BEFORE INSERT
    ON public.institutes
    FOR EACH ROW
    EXECUTE PROCEDURE public.date_time_created_stamp();

COMMENT ON TRIGGER institutes_date_time_created_stamp ON public.institutes
    IS 'Date and time of creation of a registered institute';


CREATE TRIGGER institutes_date_time_modified_stamp
    BEFORE INSERT OR UPDATE 
    ON public.institutes
    FOR EACH ROW
    EXECUTE PROCEDURE public.date_time_modified_stamp();

COMMENT ON TRIGGER institutes_date_time_modified_stamp ON public.institutes
    IS 'Date and time of modification of a registered institute';


CREATE TRIGGER subjects_date_time_created_stamp
    BEFORE INSERT
    ON public.subjects
    FOR EACH ROW
    EXECUTE PROCEDURE public.date_time_created_stamp();

COMMENT ON TRIGGER subjects_date_time_created_stamp ON public.subjects
    IS 'Date and time of creation of a registered subject';


CREATE TRIGGER subjects_date_time_modified_stamp
    BEFORE INSERT OR UPDATE 
    ON public.subjects
    FOR EACH ROW
    EXECUTE PROCEDURE public.date_time_modified_stamp();

COMMENT ON TRIGGER subjects_date_time_modified_stamp ON public.subjects
    IS 'Date and time of modification of a registered subject';


CREATE TRIGGER teacher_subjects_date_time_created_stamp
    BEFORE INSERT
    ON public.teacher_subjects
    FOR EACH ROW
    EXECUTE PROCEDURE public.date_time_created_stamp();

COMMENT ON TRIGGER teacher_subjects_date_time_created_stamp ON public.teacher_subjects
    IS 'Date and time of creation of an approved teacher subject';


CREATE TRIGGER teachers_date_time_created_stamp
    BEFORE INSERT
    ON public.teachers
    FOR EACH ROW
    EXECUTE PROCEDURE public.date_time_created_stamp();

COMMENT ON TRIGGER teachers_date_time_created_stamp ON public.teachers
    IS 'Date and time of creation of an authorized teacher user';


CREATE TRIGGER teachers_date_time_modified_stamp
    BEFORE INSERT OR UPDATE 
    ON public.teachers
    FOR EACH ROW
    EXECUTE PROCEDURE public.date_time_modified_stamp();

COMMENT ON TRIGGER teachers_date_time_modified_stamp ON public.teachers
    IS 'Date and time of modification of an authorized teacher user';


CREATE TRIGGER trainer_subjects_date_time_created_stamp
    BEFORE INSERT
    ON public.trainer_subjects
    FOR EACH ROW
    EXECUTE PROCEDURE public.date_time_created_stamp();

COMMENT ON TRIGGER trainer_subjects_date_time_created_stamp ON public.trainer_subjects
    IS 'Date and time of creation of an approved trainer subject';


CREATE TRIGGER trainers_date_time_created_stamp
    BEFORE INSERT
    ON public.trainers
    FOR EACH ROW
    EXECUTE PROCEDURE public.date_time_created_stamp();

COMMENT ON TRIGGER trainers_date_time_created_stamp ON public.trainers
    IS 'Date and time of creation of an approved trainer user';


CREATE TRIGGER trainers_date_time_modified_stamp
    BEFORE INSERT OR UPDATE 
    ON public.trainers
    FOR EACH ROW
    EXECUTE PROCEDURE public.date_time_modified_stamp();

COMMENT ON TRIGGER trainers_date_time_modified_stamp ON public.trainers
    IS 'Date and time of modification of an approved trainer user';


CREATE TRIGGER levels_of_education_date_time_created_stamp
    BEFORE INSERT
    ON public.levels_of_education
    FOR EACH ROW
    EXECUTE PROCEDURE public.date_time_created_stamp();

COMMENT ON TRIGGER levels_of_education_date_time_created_stamp ON public.levels_of_education
    IS 'Date and time of creation of an approved trainer user';


CREATE TRIGGER levels_of_education_date_time_modified_stamp
    BEFORE INSERT OR UPDATE 
    ON public.levels_of_education
    FOR EACH ROW
    EXECUTE PROCEDURE public.date_time_modified_stamp();

COMMENT ON TRIGGER levels_of_education_date_time_modified_stamp ON public.levels_of_education
    IS 'Date and time of modification of an approved trainer user';
