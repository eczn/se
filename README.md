
> lisp dialect: se

# SE 

the implementation of se inspired from `Scheme`

# Usage 

``` bash 
$ git clone https://github.com/eczn/se.git 
$ cd se 
$ npm i 
$ tsc
# cli tool
$ npm link
$ se ./example/play.se
```

cli usage: 

``` bash
$ se <file>
```

# Example

here: [example](./example)


# Syntax

## define 

``` scheme
(define var
    (+ 1 1))

(define (add x y)
    (+ x y))
```

## lambda

``` scheme
(define (double x)
    (+ x x))

(define double-2
    (lambda (x) (+ x x)))
```

## recurse

``` scheme
(define (sum n)
    (if (> n 0)
        (+ n (sum (- n 1)))
        0))

;; 5 + 4 + 3 + 2 + 1 + 0 = 15
(log (sum 5))
```

## point args & apply args

``` scheme
(define (add-all a . b)
    (if (null? a)
        0
        (+ a (apply add-all b))))

(log 
    (add-all 1 2 3 4 5))
;; 15
```

## cons

``` scheme
(define pair
    (cons 1 2))

(log (car pair))
(log (cdr pair))
```

## list

``` scheme
(define (double x)
    (+ x x))

(define my-lst
    (list 1 2 3 4))

(log "for-each")
(for-each log my-lst)

(log "map")
(for-each log 
    (map double my-lst))
```

# Checklist 

1. [x] parse s-expression
2. [x] define & lexical scope
3. [x] lambda & closure invoke
4. [x] recursive invoke
5. [x] if statement control stream
6. [x] variable length parameter
7. [x] cons & list

# License

MIT
