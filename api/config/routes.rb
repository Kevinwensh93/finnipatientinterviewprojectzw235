Rails.application.routes.draw do
  get "up", to: "rails/health#show", as: :rails_health_check

  resources :patients do
    resources :addresses, except: [:new, :edit] 
    resources :custom_field_values, except: [:new, :edit]
  end

  resources :custom_fields, except: [:new, :edit]
end