--
-- PostgreSQL database dump
--

-- Dumped from database version 15.1
-- Dumped by pg_dump version 15.1

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: iorder; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.iorder (
    oid integer NOT NULL,
    pid integer,
    styleid integer,
    sizeid integer,
    date date NOT NULL,
    status integer NOT NULL,
    totalprice numeric NOT NULL,
    uid integer DEFAULT 1 NOT NULL
);


ALTER TABLE public.iorder OWNER TO postgres;

--
-- Name: iorder_Oid_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."iorder_Oid_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."iorder_Oid_seq" OWNER TO postgres;

--
-- Name: iorder_Oid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."iorder_Oid_seq" OWNED BY public.iorder.oid;


--
-- Name: product; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.product (
    pid integer NOT NULL,
    bandname character varying(20) NOT NULL,
    cost numeric NOT NULL
);


ALTER TABLE public.product OWNER TO postgres;

--
-- Name: product_pid_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.product_pid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.product_pid_seq OWNER TO postgres;

--
-- Name: product_pid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.product_pid_seq OWNED BY public.product.pid;


--
-- Name: size; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.size (
    sid integer NOT NULL,
    name character varying(30) NOT NULL,
    cost numeric NOT NULL
);


ALTER TABLE public.size OWNER TO postgres;

--
-- Name: size_sid_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.size_sid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.size_sid_seq OWNER TO postgres;

--
-- Name: size_sid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.size_sid_seq OWNED BY public.size.sid;


--
-- Name: style; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.style (
    sid integer NOT NULL,
    type integer NOT NULL,
    des character varying(60) NOT NULL,
    cost numeric NOT NULL
);


ALTER TABLE public.style OWNER TO postgres;

--
-- Name: style_sid_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.style_sid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.style_sid_seq OWNER TO postgres;

--
-- Name: style_sid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.style_sid_seq OWNED BY public.style.sid;


--
-- Name: userall; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.userall (
    username character varying(255) NOT NULL,
    password character varying(255) NOT NULL,
    name character varying(100) NOT NULL,
    email character varying(100),
    address character varying(255),
    phone character varying(20),
    role integer NOT NULL,
    uid integer NOT NULL
);


ALTER TABLE public.userall OWNER TO postgres;

--
-- Name: userall_uid_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.userall_uid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.userall_uid_seq OWNER TO postgres;

--
-- Name: userall_uid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.userall_uid_seq OWNED BY public.userall.uid;


--
-- Name: iorder oid; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.iorder ALTER COLUMN oid SET DEFAULT nextval('public."iorder_Oid_seq"'::regclass);


--
-- Name: product pid; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.product ALTER COLUMN pid SET DEFAULT nextval('public.product_pid_seq'::regclass);


--
-- Name: size sid; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.size ALTER COLUMN sid SET DEFAULT nextval('public.size_sid_seq'::regclass);


--
-- Name: style sid; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.style ALTER COLUMN sid SET DEFAULT nextval('public.style_sid_seq'::regclass);


--
-- Name: userall uid; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.userall ALTER COLUMN uid SET DEFAULT nextval('public.userall_uid_seq'::regclass);


--
-- Name: iorder iorder_PK; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.iorder
    ADD CONSTRAINT "iorder_PK" PRIMARY KEY (oid);


--
-- Name: product product_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.product
    ADD CONSTRAINT product_pkey PRIMARY KEY (pid);


--
-- Name: size size_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.size
    ADD CONSTRAINT size_pkey PRIMARY KEY (sid);


--
-- Name: style style_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.style
    ADD CONSTRAINT style_pkey PRIMARY KEY (sid);


--
-- Name: userall userall_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.userall
    ADD CONSTRAINT userall_pkey PRIMARY KEY (uid);


--
-- Name: iorder iorder_Sizeid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.iorder
    ADD CONSTRAINT "iorder_Sizeid_fkey" FOREIGN KEY (sizeid) REFERENCES public.size(sid) NOT VALID;


--
-- Name: iorder iorder_Styleid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.iorder
    ADD CONSTRAINT "iorder_Styleid_fkey" FOREIGN KEY (styleid) REFERENCES public.style(sid) NOT VALID;


--
-- Name: iorder iorder_pid_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.iorder
    ADD CONSTRAINT iorder_pid_fk FOREIGN KEY (pid) REFERENCES public.product(pid) NOT VALID;


--
-- Name: iorder iorder_uid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.iorder
    ADD CONSTRAINT iorder_uid_fkey FOREIGN KEY (uid) REFERENCES public.userall(uid) NOT VALID;


--
-- PostgreSQL database dump complete
--

