#!/bin/bash

# constant variables 
component_path='src/components/';
format_index_file='tsx';
format_styling_file='ts';

printf "Tools for make component \n";
read -p "Directory name (src/components/): " directory_name

directory_path="${component_path}${directory_name}"

# Make component directory
mkdir $directory_path

# Create new file (index, styles) from templates
cat templates/newComponent.txt >> "${directory_path}/index.${format_index_file}";
cat templates/styleComponent.txt >> "${directory_path}/styles.${format_styling_file}";