Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  post "/users", to: "users#create"
  post "/login", to: "users#login"
  get "/users", to: "users#index"
  get "/auto_login", to: "users#auto_login"
  get "/templates/:id", to: "templates#show"
  patch "/templates/:id", to: "templates#update"
  post "/templates", to: "templates#create"
  post "/pages", to: "pages#create"
  get "/pages/:id", to: "pages#show"
  get "/pages", to: "pages#index"
  get "/projects", to: "projects#index"
  get "/projects/:id", to: "projects#show"
  post "/projects", to: "projects#create"
  patch "/projects/:id", to: "projects#update"
end

