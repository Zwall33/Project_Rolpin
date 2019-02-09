CREATE DATABASE lea_rolpin;
USE lea_rolpin;

CREATE TABLE Production (day TIMESTAMP, nb_plis_heure INT, nb_stack_jour INT);
CREATE TABLE Defaut (day TIMESTAMP, defaut1 BOOLEAN, defaut2 BOOLEAN);
