class SongController < ApplicationController
require "pry"
require "pry-nav"
	def index
		binding.pry
		# {song: song["name"], tags: song["tags"]}
		render json: Song.all
	end

	def create
		
	end

end
