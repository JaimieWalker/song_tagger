class SongController < ApplicationController
	skip_before_action :verify_authenticity_token
require "pry"
require "pry-nav"
require 'csv'
require 'json'
include SongHelper

	def index
		results = []
		song = "%#{params['song']}%"
		tags = []
		if params["tags"]
			params["tags"].each do |tag|
				 tags << "%#{tag}%"
			end
		end

		case 
			when params["tags"] && params["song"]
				songs = Song.where("name LIKE ?", song)
				tagged_songs = get_songs_with_tags(tags)
				songs = tagged_songs & songs
				if songs.class != Array
					songs = []
				end
				results = create_hash(songs)
			when params["tags"]
				songs = get_songs_with_tags(tags)
				results = create_hash(songs)
			when params["song"]
				songs = Song.where("name LIKE ?", song)
				results = create_hash(songs)
			else
				results = create_hash(Song.all)
		end
		render json: results
	end

	def new
		result = Song.where(name: params["song"])
		result = create_hash(result)
		render json: result
	end

	def create
		songs = []
		result = JSON.parse(request.body.read)
		song = Song.create(name: result["song"])
		songs << song
		result["tags"].each do |tag|
			next if tag.size < 3
			song.tags << Tag.find_or_create_by(name: tag)
		end
		render json: create_hash(songs)
	end

	def export
		File.delete("public/your_songs.csv") if File.exist?("public/your_songs.csv")
		my_file = CSV.open("public/your_songs.csv", "wb") do |csv,index|
		  csv << ["song","tags"]
		end


		a_file = CSV.open("public/your_songs.csv","a+") do |csv|
			JSON.parse(request.body.read).each do |hash|
		    	csv << hash.values
			end			
		end
		send_file ("#{Rails.root}/public/your_songs.csv"), :type => "text/csv"
	end

	def show
		send_file ("#{Rails.root}/public/your_songs.csv"), :type => "text/csv"
	end



end
