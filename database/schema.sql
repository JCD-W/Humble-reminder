#CREATE DATABASE IF NOT EXISTS humble_reminder_db;
#USE humble_reminder_db;

CREATE TABLE IF NOT EXISTS board (
	board_id BINARY(16) PRIMARY KEY NOT NULL DEFAULT (UUID_TO_BIN(UUID())),
	board_title VARCHAR(45) NOT NULL,
	board_desc VARCHAR(512),
	board_state ENUM("active", "archived", "deleted") NOT NULL DEFAULT "active",
	board_creation DATETIME NOT NULL DEFAULT NOW(),
	board_recent DATETIME NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS theme (
	theme_id INT UNSIGNED PRIMARY KEY NOT NULL AUTO_INCREMENT,
	clear_color CHAR(6) NOT NULL,
	primary_color CHAR(6) NOT NULL,
	secondary_color CHAR(6) NOT NULL,
	tertiary_color CHAR(6) NOT NULL
);

CREATE TABLE IF NOT EXISTS board_column (
	column_id INT UNSIGNED PRIMARY KEY NOT NULL AUTO_INCREMENT,
	column_title VARCHAR(32) NOT NULL,
	column_state ENUM("active", "archived", "deleted") NOT NULL DEFAULT "active"
);

CREATE TABLE IF NOT EXISTS task (
	task_id INT UNSIGNED PRIMARY KEY NOT NULL AUTO_INCREMENT,
	task_name VARCHAR(32) NOT NULL,
	task_desc VARCHAR(512) NOT NULL,
	task_state ENUM("active", "archived", "deleted") NOT NULL DEFAULT "active",
	task_type ENUM("normal", "deliver_url", "deliver_file") NOT NULL DEFAULT "normal",
	task_deliver VARCHAR(256),
	task_deadline DATETIME,
	task_creation DATETIME DEFAULT NOW(),
	task_delivered DATETIME
);

CREATE TABLE IF NOT EXISTS user (
	user_id BINARY(16) PRIMARY KEY NOT NULL DEFAULT (UUID_TO_BIN(UUID())),
    user_name VARCHAR(25) NOT NULL UNIQUE,
	user_pass BINARY(24) NOT NULL
);

CREATE TABLE IF NOT EXISTS board_has_column (
	column_id INT UNSIGNED NOT NULL,
	board_id BINARY(16) NOT NULL,
	column_position INT NOT NULL,
	FOREIGN KEY (column_id) REFERENCES board_column(column_id),
	FOREIGN KEY (board_id) REFERENCES board(board_id)
);

CREATE TABLE IF NOT EXISTS column_has_task (
	column_id INT UNSIGNED NOT NULL,
	task_id INT UNSIGNED NOT NULL,
	task_position INT NOT NULL,
	FOREIGN KEY (column_id) REFERENCES board_column(column_id),
	FOREIGN KEY (task_id) REFERENCES task(task_id)
);

CREATE TABLE IF NOT EXISTS board_has_theme (
	board_id BINARY(16) NOT NULL,
	theme_id INT UNSIGNED NOT NULL DEFAULT 0,
	FOREIGN KEY (board_id) REFERENCES board(board_id),
	FOREIGN KEY (theme_id) REFERENCES theme(theme_id)
);

CREATE TABLE IF NOT EXISTS user_has_board (
	board_id BINARY(16) NOT NULL,
	user_id BINARY(16) NOT NULL,
	FOREIGN KEY (board_id) REFERENCES board(board_id),
	FOREIGN KEY (user_id) REFERENCES user(user_id)
);