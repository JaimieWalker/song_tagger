# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
require 'csv'
require "pry"
require "pry-nav"

csv_text = File.read("#{Dir.pwd}/db/songs_with_tags.csv")
csv = CSV.parse(csv_text, :headers => true)
csv.each do |row|
	song = Song.create(name: row["song"])
	row["tags"].split(",").each do |tag|
		song.tags << Tag.find_or_create_by(name: tag)
	end
end