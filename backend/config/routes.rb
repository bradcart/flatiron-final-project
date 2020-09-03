Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  post "/users", to: "users#create"
  post "/login", to: "users#login"
  get "/auto_login", to: "users#auto_login"
  get "/users", to: "users#index"
  get "/templates/:id", to: "templates#show"
  post "/templates", to: "templates#create"
  post "/pages", to: "pages#create"
  get "/pages/:id", to: "pages#show"
end

