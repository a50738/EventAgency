PGDMP         2                x           eventagency    12.2    12.2 3    @           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            A           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            B           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            C           1262    16393    eventagency    DATABASE     �   CREATE DATABASE eventagency WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'Polish_Poland.1250' LC_CTYPE = 'Polish_Poland.1250';
    DROP DATABASE eventagency;
                postgres    false            �            1259    16443    courses    TABLE     �   CREATE TABLE public.courses (
    id bigint NOT NULL,
    name character varying(200) NOT NULL,
    price numeric(6,2),
    "createdAt" date,
    "updatedAt" date
);
    DROP TABLE public.courses;
       public         heap    postgres    false            �            1259    16441    courses_id_seq    SEQUENCE     w   CREATE SEQUENCE public.courses_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE public.courses_id_seq;
       public          postgres    false    211            D           0    0    courses_id_seq    SEQUENCE OWNED BY     A   ALTER SEQUENCE public.courses_id_seq OWNED BY public.courses.id;
          public          postgres    false    210            �            1259    16396    events    TABLE     o  CREATE TABLE public.events (
    id bigint NOT NULL,
    title character varying(60) NOT NULL,
    city character varying(40) NOT NULL,
    place_of_meet character varying(60),
    date_of_meet timestamp without time zone,
    start_date date NOT NULL,
    end_date date NOT NULL,
    amount_of_people smallint NOT NULL,
    "createdAt" date,
    "updatedAt" date
);
    DROP TABLE public.events;
       public         heap    postgres    false            �            1259    16394    events_id_event_seq    SEQUENCE     |   CREATE SEQUENCE public.events_id_event_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 *   DROP SEQUENCE public.events_id_event_seq;
       public          postgres    false    203            E           0    0    events_id_event_seq    SEQUENCE OWNED BY     E   ALTER SEQUENCE public.events_id_event_seq OWNED BY public.events.id;
          public          postgres    false    202            �            1259    16420    participations    TABLE     �   CREATE TABLE public.participations (
    id bigint NOT NULL,
    id_user bigint NOT NULL,
    id_event bigint NOT NULL,
    id_position bigint,
    salary numeric(6,2),
    "createdAt" date,
    "updatedAt" date
);
 "   DROP TABLE public.participations;
       public         heap    postgres    false            �            1259    16418    participations_id_seq    SEQUENCE     ~   CREATE SEQUENCE public.participations_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 ,   DROP SEQUENCE public.participations_id_seq;
       public          postgres    false    209            F           0    0    participations_id_seq    SEQUENCE OWNED BY     O   ALTER SEQUENCE public.participations_id_seq OWNED BY public.participations.id;
          public          postgres    false    208            �            1259    16412 	   positions    TABLE     �   CREATE TABLE public.positions (
    id bigint NOT NULL,
    name character varying(150) NOT NULL,
    "createdAt" date,
    "updatedAt" date
);
    DROP TABLE public.positions;
       public         heap    postgres    false            �            1259    16410    positions_id_seq    SEQUENCE     y   CREATE SEQUENCE public.positions_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 '   DROP SEQUENCE public.positions_id_seq;
       public          postgres    false    207            G           0    0    positions_id_seq    SEQUENCE OWNED BY     E   ALTER SEQUENCE public.positions_id_seq OWNED BY public.positions.id;
          public          postgres    false    206            �            1259    16404    users    TABLE     6  CREATE TABLE public.users (
    id bigint NOT NULL,
    name character varying(50) NOT NULL,
    surname character varying(50) NOT NULL,
    email character varying(100) NOT NULL,
    address character varying(200),
    phone_number character varying(9) NOT NULL,
    "createdAt" date,
    "updatedAt" date
);
    DROP TABLE public.users;
       public         heap    postgres    false            �            1259    16469    users_courses    TABLE     �   CREATE TABLE public.users_courses (
    id bigint NOT NULL,
    id_user bigint NOT NULL,
    id_course bigint NOT NULL,
    "createdAt" date,
    "updatedAt" date
);
 !   DROP TABLE public.users_courses;
       public         heap    postgres    false            �            1259    16467    users_courses_id_seq    SEQUENCE     }   CREATE SEQUENCE public.users_courses_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 +   DROP SEQUENCE public.users_courses_id_seq;
       public          postgres    false    213            H           0    0    users_courses_id_seq    SEQUENCE OWNED BY     M   ALTER SEQUENCE public.users_courses_id_seq OWNED BY public.users_courses.id;
          public          postgres    false    212            �            1259    16402    users_id_seq    SEQUENCE     u   CREATE SEQUENCE public.users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.users_id_seq;
       public          postgres    false    205            I           0    0    users_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;
          public          postgres    false    204            �
           2604    16446 
   courses id    DEFAULT     h   ALTER TABLE ONLY public.courses ALTER COLUMN id SET DEFAULT nextval('public.courses_id_seq'::regclass);
 9   ALTER TABLE public.courses ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    211    210    211            �
           2604    16399 	   events id    DEFAULT     l   ALTER TABLE ONLY public.events ALTER COLUMN id SET DEFAULT nextval('public.events_id_event_seq'::regclass);
 8   ALTER TABLE public.events ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    203    202    203            �
           2604    16423    participations id    DEFAULT     v   ALTER TABLE ONLY public.participations ALTER COLUMN id SET DEFAULT nextval('public.participations_id_seq'::regclass);
 @   ALTER TABLE public.participations ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    209    208    209            �
           2604    16415    positions id    DEFAULT     l   ALTER TABLE ONLY public.positions ALTER COLUMN id SET DEFAULT nextval('public.positions_id_seq'::regclass);
 ;   ALTER TABLE public.positions ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    207    206    207            �
           2604    16407    users id    DEFAULT     d   ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);
 7   ALTER TABLE public.users ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    205    204    205            �
           2604    16472    users_courses id    DEFAULT     t   ALTER TABLE ONLY public.users_courses ALTER COLUMN id SET DEFAULT nextval('public.users_courses_id_seq'::regclass);
 ?   ALTER TABLE public.users_courses ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    212    213    213            ;          0    16443    courses 
   TABLE DATA           L   COPY public.courses (id, name, price, "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    211   �:       3          0    16396    events 
   TABLE DATA           �   COPY public.events (id, title, city, place_of_meet, date_of_meet, start_date, end_date, amount_of_people, "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    203   ;       9          0    16420    participations 
   TABLE DATA           n   COPY public.participations (id, id_user, id_event, id_position, salary, "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    209   O<       7          0    16412 	   positions 
   TABLE DATA           G   COPY public.positions (id, name, "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    207    =       5          0    16404    users 
   TABLE DATA           j   COPY public.users (id, name, surname, email, address, phone_number, "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    205   c=       =          0    16469    users_courses 
   TABLE DATA           Y   COPY public.users_courses (id, id_user, id_course, "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    213   �>       J           0    0    courses_id_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('public.courses_id_seq', 3, true);
          public          postgres    false    210            K           0    0    events_id_event_seq    SEQUENCE SET     B   SELECT pg_catalog.setval('public.events_id_event_seq', 11, true);
          public          postgres    false    202            L           0    0    participations_id_seq    SEQUENCE SET     D   SELECT pg_catalog.setval('public.participations_id_seq', 37, true);
          public          postgres    false    208            M           0    0    positions_id_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public.positions_id_seq', 9, true);
          public          postgres    false    206            N           0    0    users_courses_id_seq    SEQUENCE SET     C   SELECT pg_catalog.setval('public.users_courses_id_seq', 15, true);
          public          postgres    false    212            O           0    0    users_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.users_id_seq', 24, true);
          public          postgres    false    204            �
           2606    16448    courses courses_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public.courses
    ADD CONSTRAINT courses_pkey PRIMARY KEY (id);
 >   ALTER TABLE ONLY public.courses DROP CONSTRAINT courses_pkey;
       public            postgres    false    211            �
           2606    16401    events events_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public.events
    ADD CONSTRAINT events_pkey PRIMARY KEY (id);
 <   ALTER TABLE ONLY public.events DROP CONSTRAINT events_pkey;
       public            postgres    false    203            �
           2606    16425 "   participations participations_pkey 
   CONSTRAINT     `   ALTER TABLE ONLY public.participations
    ADD CONSTRAINT participations_pkey PRIMARY KEY (id);
 L   ALTER TABLE ONLY public.participations DROP CONSTRAINT participations_pkey;
       public            postgres    false    209            �
           2606    16417    positions positions_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public.positions
    ADD CONSTRAINT positions_pkey PRIMARY KEY (id);
 B   ALTER TABLE ONLY public.positions DROP CONSTRAINT positions_pkey;
       public            postgres    false    207            �
           2606    16474     users_courses users_courses_pkey 
   CONSTRAINT     ^   ALTER TABLE ONLY public.users_courses
    ADD CONSTRAINT users_courses_pkey PRIMARY KEY (id);
 J   ALTER TABLE ONLY public.users_courses DROP CONSTRAINT users_courses_pkey;
       public            postgres    false    213            �
           2606    16409    users users_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
       public            postgres    false    205            �
           2606    16431 +   participations participations_id_event_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.participations
    ADD CONSTRAINT participations_id_event_fkey FOREIGN KEY (id_event) REFERENCES public.events(id);
 U   ALTER TABLE ONLY public.participations DROP CONSTRAINT participations_id_event_fkey;
       public          postgres    false    209    2724    203            �
           2606    16436 .   participations participations_id_position_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.participations
    ADD CONSTRAINT participations_id_position_fkey FOREIGN KEY (id_position) REFERENCES public.positions(id);
 X   ALTER TABLE ONLY public.participations DROP CONSTRAINT participations_id_position_fkey;
       public          postgres    false    2728    209    207            �
           2606    16426 *   participations participations_id_user_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.participations
    ADD CONSTRAINT participations_id_user_fkey FOREIGN KEY (id_user) REFERENCES public.users(id);
 T   ALTER TABLE ONLY public.participations DROP CONSTRAINT participations_id_user_fkey;
       public          postgres    false    209    2726    205            �
           2606    16480 *   users_courses users_courses_id_course_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.users_courses
    ADD CONSTRAINT users_courses_id_course_fkey FOREIGN KEY (id_course) REFERENCES public.courses(id);
 T   ALTER TABLE ONLY public.users_courses DROP CONSTRAINT users_courses_id_course_fkey;
       public          postgres    false    211    2732    213            �
           2606    16475 (   users_courses users_courses_id_user_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.users_courses
    ADD CONSTRAINT users_courses_id_user_fkey FOREIGN KEY (id_user) REFERENCES public.users(id);
 R   ALTER TABLE ONLY public.users_courses DROP CONSTRAINT users_courses_id_user_fkey;
       public          postgres    false    205    213    2726            ;   6   x�3�NM.-�,�Tp/M,J�40�30���".#N�Ԕ���NSd�=... ۚt      3      x�u��N�0E�����8�%��(Et�M7&q!J�TNh���!�y��4�ѽ3D�w6#�׼!�1��)���޺wW��=����J-�V(��0S(P)Y�ߞ�����j��� ����s\H4lO�Y�m�gS�0���;W؝(�%2��pJ��01�x�]1�d���*�r.x��4A���U�����b��6���K]� ����HD�?��\z&�?���/�`}p��_���)N�8�mN�]?̪���'���@�MF-.�vq�a2��}U�G�'3�f�������      9   �   x�u��� ���]�]�d�9꣑
UPx0��;_�^�THCN�޹X-O�[�C��2�lx��͈�T�u�F�G*�|�,/����ҾPK��=�S��I��fWe!*2�?$������/�'�`� 
�ն�W��S�bY�]~���"�e�����?H_P�      7   S   x�3�NM.-�,�Tp/M,J��".#����rߘ�#��$���7��MM�L��,9��S*�����tLu����\1z\\\ ��4      5   q  x�u��n�0���S� Icؐ:TJ�4"C�.�T0�ȘF��w�{� I�ݾ;������$�ik-akNBAu=���t�<�<��i��2�=$^�UP=rag�o�i�"�-��A읕�ADㄥ�~ب�$
a=�l0P;���P�����]�YK���ٜ�_!=$��p�^&{i�Һ�}���l/�G]�EP�sg�������&��4�D)�IUK��������q�0N��gⰓNZ�Y�YA?q�O<^���6B�k�gc%���)�3�%����9bN�����g�A�A��δx/���)E)�����&p0��>`3�N�qR)ĸ��U�^���˽�}E����      =   A   x�uɱ�0���ŁH��2��@UԨ{�	:�g�']��G��ӱ'�Q�_ْ�R�^$?���     