Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  	resources :song
  	post "song/export" => "song#export"
    root to: 'application#index'
	get "*path" => "application#index", format: false
end
